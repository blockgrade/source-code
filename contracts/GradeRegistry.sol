// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GradeRegistry {

    struct Grade {
        bytes32 id; 
        string student;
        string discipline;
        uint grade;
        uint timestamp;
        string document;
        address from;
    }

    struct GradeHistory {
        Grade[] versions;
    }

    Grade[] public grades;
    mapping(bytes32 => GradeHistory) private gradeHistories;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function generateId(string memory student, string memory discipline, uint grade, string calldata document, address from, uint timestamp) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(student, discipline, grade, document, from, timestamp));
    }

    function submitGradeWithFee(string calldata student, string calldata discipline, uint grade, string calldata document) external payable {
        require(msg.value > 0, 'Please pay more than 0 ether');
        owner.transfer(msg.value);

        uint timestamp = block.timestamp;
        bytes32 gradeId = generateId(student, discipline, grade, document, msg.sender, timestamp);

        Grade memory newGrade = Grade(gradeId, student, discipline, grade, timestamp, document, msg.sender);
        grades.push(newGrade);

        gradeHistories[gradeId].versions.push(newGrade);
    }

    function updateGrade(bytes32 gradeId, string calldata student, string calldata discipline, uint gradeValue, string calldata document) external {
        require(gradeHistories[gradeId].versions.length > 0, "Invalid ID");
        Grade storage currentGrade = grades[findGradeIndex(gradeId)];
        require(currentGrade.from == msg.sender, "You can only update your own grades");

        currentGrade.student = student;
        currentGrade.discipline = discipline;
        currentGrade.grade = gradeValue;
        currentGrade.document = document;
        currentGrade.timestamp = block.timestamp;

        gradeHistories[gradeId].versions.push(currentGrade);
    }

    function findGradeIndex(bytes32 gradeId) private view returns (uint) {
        for (uint i = 0; i < grades.length; i++) {
            if (grades[i].id == gradeId) {
                return i;
            }
        }
        revert("Grade not found");
    }

    function getGrades() public view returns (Grade[] memory) {
        return grades;
    }

    function getGradeHistory(bytes32 gradeId) public view returns (Grade[] memory) {
        require(gradeHistories[gradeId].versions.length > 0, "Invalid ID");
        return gradeHistories[gradeId].versions;
    }
}
