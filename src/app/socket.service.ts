import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

//httpservice
import { HttpClient, HttpHeaders, HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'

})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';
  private socket;

  constructor(public http: HttpClient) {
    //connection is being created.
    //handshake that is happening
    this.socket = io(this.url);
   }

   //events to be listened

   public verifyUser=()=>{
     return Observable.create((observer)=>{
       this.socket.on('verifyUser', (data)=>{
         observer.next(data);
       }); //end socket
     }); //end observable

   }//end verifyUser

   public onlineUserList = ()=>{
     return Observable.create((observer)=>{
       this.socket.on('online-user-list',(userList)=>{
         observer.next(userList);
       });// end socket
     }); // end observer
   } // end onLineUserList

   public disconnectedSocket = ()=>{
     return Observable.create((observer)=>{
       this.socket.on("disconnect", ()=>{
         observer.next();
       });//end socket
     });//end Observable
   }//end disconnected

  //end of events to be listened



  //events to be emitted
  public setUser = (authToken)=>{
    this.socket.emit('set-user',authToken);
  }//end of setUser


  public exitSocket =()=>{
    this.socket.disconnect();
  }
  
  //events to be emitted
  private handleError(err:HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof Error){
      errorMessage = `An error occured: ${err.error.message}`;

    }else{
      errorMessage = `Server returned code : ${err.status}, error message is : ${err.message}`;
    } // end condition if

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }//end handleerror

  public chatByUserId = (userId)=>{
    return Observable.create((observer)=>{
      this.socket.on(userId, (data)=>{
        observer.next(data);
      }); //end socket
    }); //end observable
  }// eng getChatMessage

  public SendChatMessage = (chatMsgObject) =>{
    this.socket.emit('chat-msg', chatMsgObject);

  }//end getChatMessage

  public markChatAsSeen = (userDetails)=>{
    this.socket.emit('marks-chat-as-seen', userDetails);
  }//end markChatAsSeen

  public getChat(senderId, receiverId, skip): Observable<any> {
    return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authtoken')}`)
    .do(data=>console.log('Data Received'))
    .catch(this.handleError)
   }


}
