import { FootballPoints } from './../footballPoints';
import { FootballDetailsService } from './../football-details.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {
  ELEMENT_DATA : FootballPoints[];
  displayedColumns: string[] = ['date', 'result', 'score'];
  isPopupOpened = true;
  dataSource = new MatTableDataSource<FootballPoints>(this.ELEMENT_DATA)
  posts:any;
  matchResults: any;
  teamStatistics: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor( private service:FootballDetailsService, private dialog: MatDialog ) { }
  private dialogRef: MatDialogRef<ModalComponent>
  ngOnInit() {
    this.getAllData();
    this.dataSource.paginator = this.paginator;
  }
  public getAllData(){
    let response = this.service.footballReports();
    response.subscribe((report) => {
      console.log(report)
      this.posts = report;
      this.matchResults =[];
      this.teamStatistics = []
      if(this.posts.length != 0) {
        for(var i=0;i< this.posts.rounds.length ;i++) {
          for(var j=0;j < this.posts.rounds[i].matches.length; j++) {
            this.matchResults.push(this.posts.rounds[i].matches[j]);
          }  
        }
      }
      // to fetch match data
      if(this.matchResults.length !=0) {
        for(let i=0;i< this.matchResults.length ;i++) {
          if(this.teamStatistics.length == 0) {
            var teaminfo = {
              key : this.matchResults[i].team1.key, 
              name : this.matchResults[i].team1.name, 
              code : this.matchResults[i].team1.code, 
              played: 1,
              win: 0,
              lost:0,
              draw:0
            } 
              this.teamStatistics.push(teaminfo);
          }
          else {
            const record = this.teamStatistics.find( team => team.key == this.matchResults[i].team1.key );
            console.log()
            if(!record) {
              var teaminfo = {
                key : this.matchResults[i].team1.key, 
                name : this.matchResults[i].team1.name, 
                code : this.matchResults[i].team1.code, 
                played: 0,
                win: 0,
                lost:0,
                draw:0
              } 
              this.teamStatistics.push(teaminfo);
            }
          }
        }
        console.log(this.teamStatistics);
      }
      // to calclate win,draw,lost
      if(this.matchResults.length !=0) {
        for(let i=0;i< this.matchResults.length ;i++) {
          // to calclate draw
          if( this.matchResults[i].score1 == this.matchResults[i].score2) {
            const drawrecord1 = this.teamStatistics.find( team => team.key == this.matchResults[i].team1.key );
            const drawrecord2 = this.teamStatistics.find( team => team.key == this.matchResults[i].team2.key );
            if(drawrecord1) {
              drawrecord1.draw = drawrecord1.draw +1;
              drawrecord1.played = drawrecord1.lost + drawrecord1.win +drawrecord1.draw
            }
            if(drawrecord2) {
              drawrecord2.draw = drawrecord2.draw +1;
              drawrecord2.played = drawrecord2.lost + drawrecord2.win +drawrecord2.draw
            }
          }
          // to calclate win
          else  if( this.matchResults[i].score1 >this.matchResults[i].score2) {
            const winRecord = this.teamStatistics.find( team => team.key == this.matchResults[i].team1.key );
            const lostRecord = this.teamStatistics.find( team => team.key == this.matchResults[i].team2.key );
            if(winRecord) {
              winRecord.win = winRecord.win +1;
              winRecord.played = winRecord.lost + winRecord.win +winRecord.draw;
            }
            if(lostRecord) {
              lostRecord.played = winRecord.lost + winRecord.win +winRecord.draw;
              lostRecord.lost = lostRecord.lost +1
            }
          }
          // to calclate lost
          else  if( this.matchResults[i].score1 < this.matchResults[i].score2) {
            const winRecord = this.teamStatistics.find( team => team.key == this.matchResults[i].team2.key );
            const lostRecord = this.teamStatistics.find( team => team.key == this.matchResults[i].team1.key );
            if(winRecord) {
              winRecord.win = winRecord.win +1;
              winRecord.played = winRecord.lost + winRecord.win +winRecord.draw;
            }
            if(lostRecord) {
              lostRecord.played = winRecord.lost + winRecord.win +winRecord.draw;
              lostRecord.lost = lostRecord.lost +1;
            }
          }

        }



        console.log(this.teamStatistics);

        
      }
      this.dataSource.data  = this.matchResults as FootballPoints[];
      console.log(this.dataSource.data)
    });
  }
  //  To fetch single result
  async showData(code){
    console.log(code);
    console.log(this.teamStatistics);
    this.isPopupOpened = true;
        for(let i=0;i< this.teamStatistics.length ;i++) {
            const records = this.teamStatistics.find( team => team.code == code);
            if (records) {
              console.log(records)
              const dialogRef = this.dialog.open(ModalComponent, {
                data: records
              });
              break;
           }     
       }
  }
}
