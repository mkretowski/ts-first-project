const inquirer = require('inquirer');
const consola = require('consola');

enum MessageVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

class Message {
  constructor(private content: string) {}
  public show(): void {
    const thisMessage = this;
    console.log(thisMessage.content);
  }
  public capitalize(): void {
    const thisMessage = this;
    thisMessage.content = thisMessage.content.charAt(0).toUpperCase() + thisMessage.content.slice(1).toLowerCase();
  }
  public toUpperCase(): void {
    const thisMessage = this;
    thisMessage.content = thisMessage.content.toUpperCase();
  }
  public toLowerCase(): void {
    const thisMessage = this;
    thisMessage.content = thisMessage.content.toLowerCase();
  }
  static showColorized(variant: MessageVariant, text: string): void {
    switch (variant) {
      case MessageVariant.Success:
        consola.success(text);
        break;
      case MessageVariant.Error:
        consola.error(text);
        break;
      case MessageVariant.Info:
        consola.info(text);
        break;
      default:
        break;
    }
  }
}

interface User {
  name: string;
  age: number;
}

class UsersData {
  private data: User[] = [];

  public showAll(): void {
    if (this.data.length === 0) console.log('No data...');
    else {
      Message.showColorized(MessageVariant.Info, 'Users Info');
      console.table(this.data);
    }
  }
  public add(newUser: User): void {
    if (
      typeof newUser.age === 'number' &&
      newUser.age > 0 &&
      typeof newUser.name === 'string' &&
      newUser.name.length > 0
    ) {
      this.data.push(newUser);
      Message.showColorized(MessageVariant.Success, 'User has been successfully added!');
    } else {
      Message.showColorized(MessageVariant.Error, 'Wrong data!');
    }
  }
  public remove(userName: string): void {
    const index = this.data.findIndex((user) => user.name === userName);
    if (index !== -1) {
      this.data.splice(index, 1);
      Message.showColorized(MessageVariant.Success, 'User deleted!');
    } else {
      Message.showColorized(MessageVariant.Error, 'User not found...');
    }
  }
}

const users = new UsersData();
users.showAll();
users.add({ name: 'Jan', age: 20 });
users.add({ name: 'Adam', age: 30 });
users.add({ name: 'Kasia', age: 23 });
users.add({ name: 'Basia', age: -6 });
users.showAll();
users.remove('Maurycy');
users.remove('Adam');
users.showAll();

const startApp = async () => {
  enum Action {
    List = 'list',
    Add = 'add',
    Remove = 'remove',
    Quit = 'quit',
  }

  type InquirerAnswers = {
    action: Action;
  };

  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then((answers: InquirerAnswers) => {
      console.log('Chosen action: ' + answers.action);
      if (answers.action === 'quit') return;
      startApp();
    });
};

startApp();
