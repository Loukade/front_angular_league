# League of Legends Frontend Application

A modern Angular application for exploring League of Legends data, including champion information and player profiles.

## Features

### Player Profiles
- Search for players by game name and tag
- View player statistics including:
  - Profile level and icon
  - Ranked statistics (Solo/Duo and Flex)
  - Champion mastery levels
  - Recent match history

### Match History
- Detailed match information including:
  - Game mode and duration
  - Team compositions
  - Player statistics (KDA, damage, CS)
  - Objective tracking (dragons, baron, towers, etc.)
  - Clickable player names to view their profiles

### Champions
- Browse all champions from the latest patch
- View champion details and information
- Access champion icons and splash art

## Technical Stack
- Angular 17
- TypeScript
- PrimeNG for UI components
- Aura theme for styling
- RESTful API integration

## API Endpoints
- `/patches/latest` - Get the latest game patch
- `/champions/key/:id/:patch` - Get champion information by ID
- `/champions/:id/:patch` - Get detail champion information by ID
- `/champions/all/:patch` - Get all champion by patch
- `/account/:gameName/:tagLine` - Get player account data

## Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `ng serve`
4. Access the application at `http://localhost:4200`

## Project Structure
- `src/app/account` - Player profile components
- `src/app/champions` - Champion listing and details
- `src/app/home` - Home page and search functionality
- `src/app/menu` - Navigation menu component

