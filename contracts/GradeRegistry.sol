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

  struct GradeHistory {
    Grade[] versions;
  }

  Grade[] public grades;
  mapping(uint => GradeHistory) private gradeHistories;
  address payable owner;  

  constructor() {
    owner = payable(msg.sender);
  }

  function submitGradeWithFee(string calldata student, string calldata discipline, uint grade, address document) external payable {
    require(msg.value > 0, 'Please pay more than 0 ether');
    owner.transfer(msg.value);

    Grade memory newGrade = Grade(student, discipline, grade, block.timestamp, document, msg.sender);
    grades.push(newGrade);

    uint index = grades.length - 1;
    gradeHistories[index].versions.push(newGrade);
  }

  function updateGrade(uint index, string calldata student, string calldata discipline, uint gradeValue, address document) external {
    require(index < grades.length, "Invalid index");
    Grade storage currentGrade = grades[index];
    require(currentGrade.from == msg.sender, "You can only update your own grades");

    gradeHistories[index].versions.push(currentGrade);

    currentGrade.student = student;
    currentGrade.discipline = discipline;
    currentGrade.grade = gradeValue;
    currentGrade.document = document;
    currentGrade.timestamp = block.timestamp;
  }

  function getGrades() public view returns (Grade[] memory) {
    return grades;
  }

  function getGradeHistory(uint index) public view returns (Grade[] memory) {
    require(index < grades.length, "Invalid index");
    return gradeHistories[index].versions;
  }
}
