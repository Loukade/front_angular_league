import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Participant {
  puuid: string;
  championName: string;
  championId: string;
  summonerName: string;
  riotIdGameName: string;
  riotIdTagline: string;
  teamId: number;
  teamPosition: string;
  role: string;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  goldEarned: number;
  visionScore: number;
  win: boolean;
  items: number[];
  summoner1Id: number;
  summoner2Id: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  perks: {
    styles: {
      style: number;
      selections: {
        perk: number;
        var1: number;
        var2: number;
        var3: number;
      }[];
    }[];
  };
}

interface MatchInfo {
  gameId: string;
  gameMode: string;
  gameType: string;
  gameStartTimestamp: number;
  gameEndTimestamp: number;
  gameDuration: number;
  mapId: number;
  participants: Participant[];
  teams: {
    teamId: number;
    win: boolean;
    objectives: {
      baron: { kills: number };
      champion: { kills: number };
      dragon: { kills: number };
      inhibitor: { kills: number };
      riftHerald: { kills: number };
      tower: { kills: number };
    };
  }[];
}

interface Match {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: MatchInfo;
}

interface RankedStats {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

interface ChampionMastery {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  markRequiredForNextLevel: number;
  tokensEarned: number;
  championSeasonMilestone: number;
  milestoneGrades: string[];
  nextSeasonMilestone: {
    requireGradeCounts: {
      [key: string]: number;
    };
    rewardMarks: number;
    bonus: boolean;
    totalGamesRequires: number;
  };
}

interface AccountData {
  puuid: string;
  profileIconId: number;
  summonerName: string;
  summoner: {
    summonerLevel: number;
    profileIconId: number;
  };
  ranked: RankedStats[];
  match_history: Match[];
  champion_mastery: ChampionMastery[];
}

interface Patch {
  _id: string;
  version: string;
  __v: number;
}

@Pipe({ name: 'duration', standalone: true })
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, DurationPipe, RouterLink],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  gameName: string = '';
  tagLine: string = '';
  accountData: AccountData | null = null;
  loading: boolean = true;
  error: string | null = null;
  matchHistory: Match[] = [];
  latestPatch: string = '';
  championNames: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadLatestPatch();
    this.route.params.subscribe(params => {
      this.gameName = params['gameName'];
      this.tagLine = params['tagLine'];
      this.loadAccountData();
    });
  }

  loadLatestPatch() {
    this.http.get<Patch>('http://localhost:3000/patches/latest').subscribe({
      next: (data) => {
        this.latestPatch = data.version;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du patch:', err);
        this.latestPatch = '14.3.1'; // Fallback
      }
    });
  }

  loadAccountData() {
    this.loading = true;
    this.error = null;

    const apiUrl = `http://localhost:3000/account/${this.gameName}/${this.tagLine}`;

    this.http.get<AccountData>(apiUrl).subscribe({
      next: (data) => {
        this.accountData = data;
        this.matchHistory = data.match_history;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des données du compte';
        this.loading = false;
        console.error(err);
      }
    });
  }

  calculateKdaRatio(kills: number, deaths: number, assists: number): number {
    return (kills + assists) / Math.max(1, deaths);
  }

  getObjectiveIconUrl(objective: string): string {
    const baseUrl = `https://ddragon.leagueoflegends.com/cdn/${this.latestPatch}/img/`;
    const icons = {
      dragon: 'dragon.png',
      baron: 'baron.png',
      tower: 'tower.png',
      inhibitor: 'inhibitor.png',
      riftHerald: 'riftHerald.png'
    };
    return baseUrl + (icons[objective as keyof typeof icons] || '');
  }

  getFirstKey(obj: { [key: string]: any }): string {
    return Object.keys(obj)[0];
  }

  getChampionNameById(id: number): string {
    if (this.championNames[id]) {
      return this.championNames[id];
    }

    this.http.get<any>(`http://localhost:3000/champions/key/${id}/${this.latestPatch}`).subscribe({
      next: (data) => {
        this.championNames[id] = data.name;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du nom du champion:', err);
        this.championNames[id] = 'Unknown';
      }
    });

    return 'Unknown';
  }
} 