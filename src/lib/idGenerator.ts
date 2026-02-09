import Counter from '../models/Counter';

/**
 * Generates a unique, sequential Student ID for the Dream Centre OAU platform.
 * Format: DCO-{DEPT_CODE}{YY}-{SEQUENCE}
 * 
 * @param departmentCode - The 3-4 letter code for the department (e.g., "SWE")
 * @param admissionYear - The 4-digit year of admission (e.g., 2024)
 * @returns A formatted student ID string (e.g., "DCO-SWE24-001")
 */
export async function generateStudentId(
  departmentCode: string,
  admissionYear: number
): Promise<string> {
  try {
    // 1. Extract the last two digits of the year (e.g., 2024 -> 24)
    const yy = admissionYear.toString().slice(-2);
    const dept = departmentCode.toUpperCase().trim();

    // 2. Atomic increment of the counter
    // findOneAndUpdate is atomic at the document level.
    // upsert: true creates the document if it doesn't exist for that dept/year.
    const counter = await Counter.findOneAndUpdate(
      { departmentCode: dept, year: admissionYear },
      { $inc: { lastSequence: 1 } },
      { 
        new: true, // Return the updated document
        upsert: true, // Create if not exists
        setDefaultsOnInsert: true 
      }
    );

    if (!counter) {
      throw new Error('Failed to generate sequence: Counter update returned null');
    }

    // 3. Check for sequence overflow (capped at 999 based on spec)
    if (counter.lastSequence > 999) {
      throw new Error(`Sequence limit reached for ${dept} in ${admissionYear}. Maximum 999 students allowed.`);
    }

    // 4. Format the sequence with 3-digit padding (e.g., 1 -> 001)
    const sequence = counter.lastSequence.toString().padStart(3, '0');

    // 5. Construct the final ID
    const studentId = `DCO-${dept}${yy}-${sequence}`;

    return studentId;
  } catch (error) {
    console.error('[ID_GENERATOR_ERROR]:', error);
    
    // Distinguish between database errors and business logic errors
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('An unexpected error occurred during Student ID generation');
  }
}
