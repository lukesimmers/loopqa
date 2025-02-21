// data/testData.ts

export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export const loginCredentials: LoginCredentials = {
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!,
  };
  
 
  export interface TestCase {
    app: string;
    task: string;
    status: string;
    description?: string;
    tags?: string[];
    assignee?: string;
    date?: string;
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
    },

    // Other Feature Test Cases
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon design',
    //   status: 'Done',
    //   assignee: 'Emma Wilson'
    // },
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon design',
    //   status: 'Done',
    //   date: '3/14/2024',
    // },

    // Failure Test Cases
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon desing',
    //   status: 'Done',
    //   tags: ['Design'],
    // },
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon design',
    //   status: 'In Progress',
    //   tags: ['Design'],
    // },
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon design',
    //   status: 'Done',
    //   tags: ['Desing'],
    // },
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon design',
    //   status: 'Done',
    //   tags: ['Design'],
    //   date: '2022-01-01',
    // },
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon design',
    //   status: 'Done',
    //   tags: ['Design'],
    //   assignee: 'John Doe',
    // },
    // {
    //   app: 'Mobile Application',
    //   task: 'App icon design',
    //   status: 'Done',
    //   tags: ['Design'],
    //   description: 'Design a new app icon.',
    // },
  ];