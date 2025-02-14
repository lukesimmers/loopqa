// data/testData.ts

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export const loginCredentials: LoginCredentials = {
    email: 'admin',
    password: 'password123',
  };
  
  export interface TestCase {
    app: string;
    task: string;
    status: string;
    tags: string[];
  }
  
  export const testCases: TestCase[] = [
    // Test Case 1
    {
      app: 'Web Application',
      task: 'Implement user authentication',
      status: 'To Do',
      tags: ['Feature', 'High Priority'],
    },
    // Test Case 2
    {
      app: 'Web Application',
      task: 'Fix navigation bug',
      status: 'To Do',
      tags: ['Bug'],
    },
    // Test Case 3
    {
        app: 'Web Application',
        task: 'Design system updates',
        status: 'In Progress',
        tags: ['Design'],
    },
    // Test Case 4
    {
        app: 'Mobile Application',
        task: 'Push notification system',
        status: 'To Do',
        tags: ['Feature'],
    },
    // Test Case 5
    {
        app: 'Mobile Application',
        task: 'Offline mode',
        status: 'In Progress',
        tags: ['Feature', 'High Priority'],
    },
    // Test Case 6
    {
        app: 'Mobile Application',
        task: 'App icon design',
        status: 'Done',
        tags: ['Design'],
    }
  ];