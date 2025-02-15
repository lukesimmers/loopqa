export function createTestName(testCase) {
    // Build the base test name
        let testName = `Verify task "${testCase.task}" in ${testCase.app} is in the "${testCase.status}" column `;
        
        // Collect optional details if they exist
        const extras: string[] = [];
        if (testCase.description !== undefined) extras.push(`description: ${testCase.description}`);
        if (testCase.tags !== undefined && testCase.tags.length > 0) extras.push(`tags: ${testCase.tags.join(', ')}`);
        if (testCase.assignee !== undefined) extras.push(`assignee: ${testCase.assignee}`);
        if (testCase.date !== undefined) extras.push(`date: ${testCase.date}`);
    
        // Append extras if any; if none, append the index to ensure uniqueness.
        if (extras.length > 0) {
          testName += ` (${extras.join(' | ')})`;
        }

        return testName;
    }