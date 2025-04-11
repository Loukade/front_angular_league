import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampionsService } from '../champions.service';

@Component({
  selector: 'app-champion-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.css']
})
export class ChampionDetailComponent implements OnInit {
  champion: any; // Pour stocker les détails du champion
  patch: string = '';
  name: string = '';

  constructor(private route: ActivatedRoute, private championsService: ChampionsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.patch = params['patch'];
      this.loadChampionDetails();
    });
  }

  loadChampionDetails(): void {
    this.championsService.getChampionDetails(this.name, this.patch).subscribe(data => {
      this.champion = data; // Assurez-vous que la réponse contient les détails du champion
    });
  }
}
