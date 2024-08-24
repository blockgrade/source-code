// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TransactionHistory {
    //Rastrear o histórico das interações com os documentos de notas, como registros, validações, e consultas.

  struct Transaction {
    uint256 timestamp;
    address actor;
    string action;
  }

  struct DocumentHistory {
    uint256 documentId;
    Transaction[] transactions;
  }

  mapping(uint256 => DocumentHistory) private documentHistories;  

    //Registrar Transação: Função que registra cada interação relevante com os documentos de notas, armazenando informações como o identificador da transação, o usuário envolvido (professor ou aluno), e o tipo de ação realizada.
    function registerTransaction(uint256 _documentId, string memory _action) public {
      Transaction memory newTransaction = Transaction({
        timestamp: block.timestamp,
        actor: msg.sender,
        action: _action
      });

      documentHistories[_documentId].documentId = _documentId;
      documentHistories[_documentId].transactions.push(newTransaction);
    }


    //Consultar Histórico: Função para que alunos ou professores visualizem o histórico das transações relacionadas a um documento específico.
    function getHistory(uint256 _documentId) public view returns (Transaction[] memory){
      require(documentHistories[_documentId].documentId != 0, "Document not found");
      return documentHistories[_documentId].transactions;
    }
}