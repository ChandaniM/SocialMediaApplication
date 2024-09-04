import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit{
  constructor(private route: Router) {}
  ngOnInit(): void {
  }
  close() {
    this.route.navigate(['chat']);
  }
}
