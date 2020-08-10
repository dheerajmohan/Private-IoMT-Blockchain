pragma solidity ^0.5.0;

contract iotBlockchain {
  uint public taskCount=0;

  constructor() public {
        createTask("genesis block","now");
      }

  struct Task {
    uint id;
    string content;
    string timestamp;
  }

    event TaskCreated(
    uint id,
    string content,
    string timestamp
  );

  Task public T;
  function createTask(string memory _content,string memory ts ) public {
    taskCount ++;
    T=Task(taskCount, _content,ts);
    emit TaskCreated(taskCount, _content,ts);
  }
}

