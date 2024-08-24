// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GradeRecord {
    //Armazenar e gerenciar os documentos de notas de provas na blockchain.
    struct Grade {
        uint256 id;
        uint256 grade;
        address document;
        string discipline;
        address teacher;
        address student;
        uint date;
        address digitalIdentity;
    }
    
    address owner;

    mapping (uint256 => Grade) public grades;
    Grade[] public gradeArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setGrade(uint256 _id, uint256 _grade, address _document, string memory _discipline, address _teacher, address _student, uint _date, address _digitalIdentity) public onlyOwner {
        Grade memory grade = Grade(_id, _grade,  _document, _discipline, _teacher, _student, _date, _digitalIdentity);
        grades[_id] = grade;
        gradeArray.push(grade);
    }

    function getGrade(uint256 _id) public view returns (uint256, address, string memory, address, address, uint, address) {
        require(grades[_id].id != 0, 'Grade is not available');
        Grade memory document = grades[_id];
        return (document.grade,  document.document, document.discipline, document.teacher, document.student, document.date, document.digitalIdentity);
    }

    function getAllGrades() public view returns (Grade[] memory) {
        return gradeArray;
    }

    function validateGrade() public onlyOwner {
        //Função para que o professor valide o documento registrado, confirmando sua autenticidade.
        // Precisa do Civic
    }
}