// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GradeRegistry {

  struct Grade {
    string student;
    string discipline;
    uint grade;
    uint timestamp;
    address document;
    address from;
  }

  Grade[] grades;
  address payable owner;  

  constructor() {
    owner = payable(msg.sender);
  }

  function submitGradeWithFee(string calldata student, string calldata discipline, uint grade, address document) external payable {
    require(msg.value > 0, 'Please pay more than 0 ether');
    owner.transfer(msg.value);
    grades.push(Grade(student, discipline, grade, block.timestamp, document, msg.sender));
  }

  function getGrades() public view returns (Grade[] memory) {
    return grades;
  }
}