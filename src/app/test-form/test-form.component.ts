import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  showQuizStart: boolean = true;
  viewQuiz: boolean = false;
  quizCompleted: boolean = false;
  viewScore: boolean = false;
  options: any = [];
  option: any = []
  answers: any;
  questions: any;
  scores: number = 0;
  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.httpClient.get('http://localhost:5000/questions').subscribe(result => {
      this.questions = result;
    }, error => {
      console.log(error)
    })
  }

  submitQuiz(form: NgForm) {
    this.options.shift();
    this.viewQuiz = false;
    this.quizCompleted = true;
    this.httpClient.get('http://localhost:4000/answers').subscribe((result: any) => {
      this.answers = result.map((answer: any) => {
        return answer.answer
      });
      form.reset();
    }, error => {
      console.log(error)
    })  
  }

  checkAnswers(){
    this.quizCompleted = false;
    this.viewScore = true;
    let c = 0;
    for (var i = 0; i < this.answers.length; i++)
      if (this.options[i] === this.answers[i])
        c++;
    this.scores = (c/this.answers.length)*100;
  }
  
  onStartQuiz(){
    this.showQuizStart = false
    this.viewQuiz = true
  }

  retakeTest(){
    window.location.reload()
  }
}
