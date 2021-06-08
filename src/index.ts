import {
  ButtonRole,
  QMainWindow,
  QWidget,
  QLabel,
  FlexLayout,
  QIcon,
  QSystemTrayIcon,
  QMenu,
  QMessageBox,
  QAction,
  QPushButton,
  WidgetEventTypes,
} from "@nodegui/nodegui";
import { Quiz, awsQuiz } from "./awsQuiz";
import logo from "../assets/aws.png";
import open from "open";

const win = new QMainWindow();
win.setWindowTitle("AWS Quiz");

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);

const question = new QLabel();
question.setObjectName("question");
question.setText("Updating AWS quiz questions, please wait...");
question.addEventListener(WidgetEventTypes.MouseButtonDblClick, () => {
  open(quizAnswer);
});
question.addEventListener(WidgetEventTypes.MouseButtonRelease, () => {
  updateQuestion(win, allQuizs);
});

rootLayout.addWidget(question);
win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: black;
    }
    #question {
      font-size: 12px;
			color: #7FFF00;
      padding: 5;
			background-color: black;
    }
  `
);
win.show();
systemTrayIcon(win);
(global as any).win = win;

var allQuizs: Array<Quiz>;
var quizQuestion: string = "";
var quizAnswer: string = "";

function updateQuestion(win: QMainWindow, Quizs: Array<Quiz>) {
  const quiz: Quiz = Quizs[Math.floor(Math.random() * Quizs.length)];
  quizQuestion = quiz.question;
  quizAnswer = quiz.answer;
  question.setText(quizQuestion);
}

function showPopup(details: string) {
  const modal = new QMessageBox();
  modal.setText(details);
  const okButton = new QPushButton();
  okButton.setText("OK");
  modal.addButton(okButton);
  modal.exec();
}

function systemTrayIcon(win: QMainWindow) {
  const tray = new QSystemTrayIcon();
  tray.setIcon(new QIcon(logo));
  tray.show();

  const menu = new QMenu();
  tray.setContextMenu(menu);

  const visibleAction = new QAction();
  menu.addAction(visibleAction);
  visibleAction.setText("Show/Hide");
  visibleAction.addEventListener("triggered", () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });

  const helpAction = new QAction();
  menu.addAction(helpAction);
  helpAction.setText("Help");
  helpAction.addEventListener("triggered", () => {
    showPopup(
      "Single click - skip anwer and go to next question\nDouble click - show answer and go to next question"
    );
  });

  const quitAction = new QAction();
  menu.addAction(quitAction);
  quitAction.setText("Quit");
  quitAction.addEventListener("triggered", () => {
    win.close();
  });

  (global as any).tray = tray;
}

awsQuiz()
  .then((quizs) => {
    allQuizs = quizs;
    updateQuestion(win, allQuizs);
  })
  .catch((err) => {
    throw new Error(err);
  });
