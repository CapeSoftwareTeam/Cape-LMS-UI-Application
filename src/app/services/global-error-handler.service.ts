import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {
  errorMessage: string="";
apphistoryid:any;
leavefileId:any
  constructor() { 
    console.log(this.errorMessage);
  }
  // conversation = new Subject<Message[]>();
  
  // getBotAnswer(msg: string) {
  //   const userMessage = new Message('user', msg); 
  //   this.conversation.next([userMessage]);
  //   if(msg=="LV Systems"){
  //     const botMessage = new Message('bot', this.getBotMessage(msg));
  //     const botMessage5 = new Message('bot', this.getBotMessageDefault5(msg));

  //     setTimeout(()=>{
  //       this.conversation.next([botMessage]);
  //     }, 1500);
  //     setTimeout(()=>{
  //       this.conversation.next([botMessage5]);
  //     }, 1500);
  //   }
  //   else if(msg=="EMC Assessment"){
  //     const botMessage = new Message('bot', this.getBotMessage(msg));
  //     const botMessage6 = new Message('bot', this.getBotMessageDefault6(msg));

  //     setTimeout(()=>{
  //       this.conversation.next([botMessage]);
  //     }, 1500);
  //     setTimeout(()=>{
  //       this.conversation.next([botMessage6]);
  //     }, 1500);
  //   }
  //   else if(msg=="LPS Systems"){
  //     const botMessage = new Message('bot', this.getBotMessage(msg));
  //     const botMessage7 = new Message('bot', this.getBotMessageDefault7(msg));

  //     setTimeout(()=>{
  //       this.conversation.next([botMessage]);
  //     }, 1500);
  //     setTimeout(()=>{
  //       this.conversation.next([botMessage7]);
  //     }, 1500);
  //   }
  //   else{
  //     const botMessage = new Message('bot', this.getBotMessage(msg));
  //     setTimeout(()=>{
  //       this.conversation.next([botMessage]);
  //     }, 1500);
  //   }
  // }

  // getBotMessage(question: string){
  //   let answer = this.Chatbot_FAQs.messageMap[question];
  //   return answer || this.Chatbot_FAQs.messageMap['default'];
  // }

  // getBotAnswerDefault(msg: string) {
  //   const botMessage = new Message('bot', this.getBotMessageDefault(msg));
  //   const botMessage1 = new Message('bot', this.getBotMessageDefault1(msg));
  //   const botMessage2 = new Message('bot', this.getBotMessageDefault2(msg));
  //   const botMessage3 = new Message('bot', this.getBotMessageDefault3(msg));
  //   const botMessage4 = new Message('bot', this.getBotMessageDefault4(msg));

  //   setTimeout(()=>{
  //     this.conversation.next([botMessage]);
  //   }, 100);
  //   setTimeout(()=>{
  //     this.conversation.next([botMessage1]);
  //   }, 100);
  //   setTimeout(()=>{
  //     this.conversation.next([botMessage2]);
  //   }, 200);
  //   setTimeout(()=>{
  //     this.conversation.next([botMessage3]);
  //   }, 200);
  //   setTimeout(()=>{
  //     this.conversation.next([botMessage4]);
  //   }, 200);
   
  // } 

  // getBotMessageDefault(question: string){
  //     return this.Chatbot_FAQs.messageMapDefault['0'];
  // }
  // getBotMessageDefault1(question: string){
  //     return this.Chatbot_FAQs.messageMapDefault['1'];
  // }
  // getBotMessageDefault2(question: string){
  //   return this.Chatbot_FAQs.messageMapDefault['2'];
  // }
  // getBotMessageDefault3(question: string) {
  //   return this.Chatbot_FAQs.messageMapDefault['3'];
  // }
  // getBotMessageDefault4(question: string) {
  //   return this.Chatbot_FAQs.messageMapDefault['4'];
  // }
  // getBotMessageDefault5(question: string) {
  //   return this.Chatbot_FAQs.messageMapDefault['5'];
  // }
  // getBotMessageDefault6(question: string) {
  //   return this.Chatbot_FAQs.messageMapDefault['6'];
  // }
  // getBotMessageDefault7(question: string) {
  //   return this.Chatbot_FAQs.messageMapDefault['7'];
  // }


  // getBotAnswerDefaultSignLogin(msg: string) {
  //   const botMessage8 = new Message('bot', this.getBotMessageDefaultSigninLogin(msg));
  //   setTimeout(()=>{
  //     this.conversation.next([botMessage8]);
  //   }, 100);
  // } 

  // getBotMessageDefaultSigninLogin(question: string) {
  //   return this.Chatbot_FAQs.messageMapSignInLogin['0'];
  // }
}
