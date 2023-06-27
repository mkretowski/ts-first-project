const inquirer = require('inquirer');
const consola = require('consola');

enum MessageVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

class Message {
  constructor(private content: string) {
    const thisMessage = this;
  }
  public show() {
    const thisMessage = this;
    console.log(thisMessage.content);
  }
  public capitalize() {
    const thisMessage = this;
    thisMessage.content = thisMessage.content.charAt(0).toUpperCase() + thisMessage.content.slice(1).toLowerCase();
  }
  public toUpperCase() {
    const thisMessage = this;
    thisMessage.content = thisMessage.content.toUpperCase();
  }
  public toLowerCase() {
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

const msg = new Message('heLlo world!');
msg.show(); // "heLlo world!"
msg.capitalize();
msg.show(); // "Hello world!"
msg.toLowerCase();
msg.show(); // "hello world!"
msg.toUpperCase();
msg.show(); // "HELLO WORLD!"
Message.showColorized(MessageVariant.Success, 'Test'); // √ "Test"
Message.showColorized(MessageVariant.Error, 'Test 2'); // "x Test 2"
Message.showColorized(MessageVariant.Info, 'Test 3'); // ℹ "Test 3"

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
