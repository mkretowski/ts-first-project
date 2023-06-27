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

interface updatedUser {
  name: string;
  newName: number;
  newAge: number;
}

class UsersData {
  private data: (User | updatedUser)[] = [];

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
  public update(updateUser: updatedUser): void {
    const index = this.data.findIndex((user) => user.name === updateUser.name);
    if (
      index !== -1 &&
      typeof updateUser.newAge === 'number' &&
      updateUser.newAge > 0 &&
      typeof updateUser.name === 'string' &&
      updateUser.name.length > 0
    ) {
      this.data[index] = updateUser;
      Message.showColorized(MessageVariant.Success, 'User has been successfully updated!');
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
console.log('\n');
console.info('???? Welcome to the UsersApp!');
console.log('====================================');
Message.showColorized(MessageVariant.Info, 'Available actions');
console.log('\n');
console.log('list – show all users');
console.log('add – add new user to the list');
console.log('update – update user data on the list');
console.log('remove – remove user from the list');
console.log('quit – quit the app');
console.log('\n');

enum Action {
  List = 'list',
  Add = 'add',
  Update = 'update',
  Remove = 'remove',
  Quit = 'quit',
}

type InquirerAnswers = {
  action: Action;
};

const startApp = () => {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
            {
              name: 'age',
              type: 'number',
              message: 'Enter age',
            },
          ]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
          ]);
          users.remove(name.name);
          break;
        case Action.Update:
          const updateUser = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name of user you want to edit:',
            },
            {
              name: 'newName',
              type: 'input',
              message: 'Enter updated name:',
            },
            {
              name: 'newAge',
              type: 'number',
              message: 'Enter updated age:',
            },
          ]);
          users.update(updateUser);
          break;
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, 'Bye bye!');
          return;
        default:
          Message.showColorized(MessageVariant.Error, 'Command not found');
          break;
      }

      startApp();
    });
};

startApp();
