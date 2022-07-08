import * as vscode from "vscode";

function checkComponents() {
  const editor = vscode.window.activeTextEditor;
  console.log("editor:", editor);
  if (!editor) {
    return;
  }

  const documentText = editor.document.getText();
  const logRegexDXMM = /dxy-mom\/dxmm-ui?/g;
  const logRegexAnt = /React?/g;
  const hasDxmUi = logRegexDXMM.exec(documentText);
  const hasAnt = logRegexAnt.exec(documentText);
  if (hasDxmUi || hasAnt) {
    if (hasDxmUi && hasAnt) {
      vscode.window.showWarningMessage(
        "当前页面包含dxmm-ui和ant-mobile组件库组件,请检查是否需替换"
      );
    } else if (hasDxmUi) {
      vscode.window.showWarningMessage(
        "当前页面包含dxmm-ui组件库组件,请检查是否需替换"
      );
    } else {
      vscode.window.showWarningMessage(
        "当前页面包含ant-mobile组件库组件,请检查是否需替换"
      );
    }
  }
}
export function activate(context: vscode.ExtensionContext) {
  // 1: 这里执行插件被激活时的操作
  console.log("我被激活了!! 嘿嘿嘿...");
  checkComponents();
  // 1: 定义了一个命令(vscode.commands)
  // 2: vscode-plugin-demo.helloWorld可以把它当做id
  let disposable = vscode.commands.registerCommand(
    "vscode-plugin-demo.helloWorld",
    function () {
      // 3: 触发了一个弹出框
      vscode.window.showInformationMessage("第一个demo弹出信息!");
    }
  );
  let navigation = vscode.commands.registerCommand("nav", function () {
    // 3: 触发了一个弹出框
    vscode.window.showInformationMessage("导航语句");
  });
  // 4: 把这个对象放入上下文中, 使其生效
  context.subscriptions.push(disposable);
  context.subscriptions.push(navigation);
}

export function deactivate() {}
