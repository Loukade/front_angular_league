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

  getStatsArray() {
    if (!this.champion?.stats) return [];
    return [
      { label: 'HP', value: this.champion.stats.hp },
      { label: 'MP', value: this.champion.stats.mp },
      { label: 'Vitesse de déplacement', value: this.champion.stats.movespeed },
      { label: 'Armure', value: this.champion.stats.armor },
      { label: 'Dégâts d\'attaque', value: this.champion.stats.attackdamage },
      { label: 'Portée d\'attaque', value: this.champion.stats.attackrange },
      { label: 'Vitesse d\'attaque', value: this.champion.stats.attackspeed },
      { label: 'Régénération HP', value: this.champion.stats.hpregen },
      { label: 'Régénération MP', value: this.champion.stats.mpregen },
      { label: 'Blocage de sorts', value: this.champion.stats.spellblock }
    ];
  }

  getStatPercentage(value: number): number {
    // Valeurs maximales approximatives pour chaque statistique
    const maxValues: { [key: string]: number } = {
      'HP': 3000,
      'MP': 2000,
      'Vitesse de déplacement': 400,
      'Armure': 200,
      'Dégâts d\'attaque': 200,
      'Portée d\'attaque': 700,
      'Vitesse d\'attaque': 1.0,
      'Régénération HP': 20,
      'Régénération MP': 20,
      'Blocage de sorts': 100
    };

    // Trouver la valeur maximale correspondante
    const maxValue = Object.values(maxValues).find(max => value <= max) || 100;
    return (value / maxValue) * 100;
  }
}
