import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChampionsService } from '../champions.service';

@Component({
  selector: 'app-champions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent {
  champions: any[] = [];
  latestPatch: string = '';

  constructor(private championsService: ChampionsService) { }

  ngOnInit(): void {
    this.championsService.getLatestPatch().subscribe(patch => {
      this.latestPatch = patch.version;
      this.loadChampions();
    });
  }

  loadChampions(): void {
    this.championsService.getChampions(this.latestPatch).subscribe(data => {
      this.champions = data;
    });
  }
}