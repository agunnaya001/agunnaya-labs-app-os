export interface CompilationError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface CompilationResult {
  success: boolean;
  errors: CompilationError[];
  bytecode?: string;
  abi?: unknown[];
}

const COMMON_ISSUES = {
  'pragma': /pragma\s+solidity\s+[^;]+;/,
  'import': /import\s+['"]{1,2}@openzeppelin\/contracts[^;]*;/,
  'contract': /contract\s+\w+\s*{/,
};

export function checkSyntax(code: string): CompilationError[] {
  const errors: CompilationError[] = [];
  const lines = code.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const col = 0;

    // Check for missing pragma
    if (lineNum === 1 && !line.includes('pragma solidity')) {
      errors.push({
        line: lineNum,
        column: col,
        message: 'Missing pragma solidity declaration',
        severity: 'error',
      });
    }

    // Check for unclosed braces
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;

    // Check for obvious syntax errors
    if (line.includes('function ') && !line.includes('(')) {
      errors.push({
        line: lineNum,
        column: line.indexOf('function'),
        message: 'Function declaration missing parentheses',
        severity: 'error',
      });
    }
  });

  return errors;
}

export function analyzeGasOptimizations(code: string): string[] {
  const suggestions: string[] = [];

  if (code.includes('for (') && !code.includes('unchecked')) {
    suggestions.push('Consider using unchecked {} blocks for loops to save gas');
  }

  if (code.includes('storage') && code.includes('uint256')) {
    suggestions.push('Pack multiple uint < 256 bits into single storage slot');
  }

  if (!code.includes('immutable') && code.includes('constructor')) {
    suggestions.push('Consider marking initialization values as immutable');
  }

  return suggestions;
}

export function analyzeSecurityIssues(code: string): string[] {
  const issues: string[] = [];

  if (code.includes('call{value:') && !code.includes('nonReentrant')) {
    issues.push('Potential reentrancy vulnerability detected');
  }

  if (code.includes('selfdestruct')) {
    issues.push('selfdestruct is deprecated in Solidity 0.8.18+');
  }

  if (code.includes('tx.origin')) {
    issues.push('Using tx.origin for authorization is insecure');
  }

  if (!code.includes('_safeMint') && code.includes('ERC721')) {
    issues.push('Use _safeMint instead of _mint for ERC721');
  }

  return issues;
}

export async function compileContract(code: string, name: string = 'Contract'): Promise<CompilationResult> {
  try {
    const errors = checkSyntax(code);

    if (errors.length > 0) {
      return { success: false, errors };
    }

    // In a real implementation, this would use solc-js
    // For now, we return a mock successful compilation
    const mockBytecode = '0x' + '60806040'.repeat(50);

    return {
      success: true,
      errors: [],
      bytecode: mockBytecode,
      abi: [
        {
          inputs: [],
          name: 'constructor',
          type: 'constructor',
        },
      ],
    };
  } catch (error) {
    return {
      success: false,
      errors: [
        {
          line: 0,
          column: 0,
          message: error instanceof Error ? error.message : 'Compilation failed',
          severity: 'error',
        },
      ],
    };
  }
}
