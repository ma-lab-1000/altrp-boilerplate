# Task Completion Protocol

## Overview
A standard procedure for committing, merging, and cleaning up a completed task branch before starting new work.

## Steps
1.  **Commit & Propose Integration**
    - Commit your work with a clear, descriptive message.
    - Create a pull request targeting the `develop` branch with description in english.

2.  **Merge & Cleanup**
    - After the pull request is approved, merge the branches.
    - Delete the source feature branch both locally and on the remote.

3.  **Verification & Synchronization**
    - Run the **[run-all-tests-and-fix-failures.md](./run-all-tests-and-fix-failures.md)** routine on the `develop` branch to ensure stability.
    - Push the updated `develop` branch to the remote repository.

4.  **Proceed to Next Task**
    - Begin the next task by following the **[goals-enforcer.md](./goals-enforcer.md)** protocol.

## Checklist
- [ ] Changes have been committed.
- [ ] Pull request has been created and merged into `develop`.
- [ ] The feature branch has been deleted.
- [ ] 'All Tests and Fix Failures' routine passed successfully.
- [ ] The `develop` branch has been pushed to the remote.
- [ ] Ready to proceed to the next task.