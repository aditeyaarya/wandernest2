# WanderNest - Guide Matching System

A sophisticated matching algorithm that connects tourists with local student guides based on availability, ratings, reliability, and shared interests.

## Features

- **Priority-Based Matching Algorithm** with scoring system
- **Anonymized Guide Display** for privacy protection
- **Multi-Select Interface** for choosing multiple guides
- **Real-time Availability Checking**
- **Comprehensive Scoring** (100-point system)

## Matching Algorithm

### Scoring System (100 Points Total)

The algorithm evaluates guides based on four key criteria:

#### 1. Availability Match (40 Points)
- Checks if the guide is available during requested dates
- Full points if available, zero if not
- Considers day-of-week availability patterns

#### 2. Rating (20 Points)
- Based on average rating from previous tourists
- Formula: `rating * 4` (max 20 for 5-star rating)
- Default rating of 3.0 for new guides

#### 3. Reliability (20 Points)
- Rewards guides with good attendance records
- Perfect record (no no-shows): 20 points
- Each no-show reduces score by 5 points
- Formula: `max(0, 20 - (noShowCount * 5))`

#### 4. Interest Overlap (20 Points)
- Matches common interests between tourist and guide
- Formula: `(overlap_count / total_interests) * 20`
- Example: 2 matching interests out of 4 = 10 points

### Filtering Criteria

Before scoring, guides are filtered by:
- **City**: Must match tourist's destination
- **Status**: Only APPROVED guides are considered
- **Nationality**: Optional preference filter
- **Languages**: Must speak at least one preferred language
- **Gender**: Optional preference (supports "no_preference")

### Results

- Returns **top 4 matches** sorted by score
- Scores are rounded to 1 decimal place
- Each guide includes anonymized information for privacy

## API Endpoints

### GET /api/matches?requestId={id}

Fetch matching guides for a tourist request.

**Response:**
```json
{
  "success": true,
  "matches": [
    {
      "id": "abc123",
      "anonymousId": "Guide #0042",
      "university": "City University",
      "languages": ["English", "Spanish"],
      "tripsHosted": 15,
      "rating": 4.8,
      "badge": "gold",
      "score": 92.5
    }
  ],
  "count": 4
}
```

### POST /api/matches

Generate new matches for a request.

**Request Body:**
```json
{
  "requestId": "request123"
}
```

### POST /api/matches/select

Save tourist's guide selections.

**Request Body:**
```json
{
  "requestId": "request123",
  "selectedGuideIds": ["guide1", "guide2"]
}
```

## Frontend Components

### GuideCard

Displays anonymized guide information:
- Anonymous ID (e.g., "Guide #0042")
- University
- Languages spoken
- Number of trips hosted
- Star rating with visual display
- Reliability badge (Bronze/Silver/Gold)
- Selection checkbox

**Usage:**
```tsx
<GuideCard
  guide={guide}
  isSelected={selectedGuides.has(guide.id)}
  onSelect={handleGuideSelect}
/>
```

### GuideSelection

Main component for guide matching and selection:
- Fetches matches from API
- Displays guide cards in grid layout
- Handles multi-selection state
- Submits selections to backend

**Usage:**
```tsx
<GuideSelection
  requestId="request123"
  onSelectionComplete={(guides) => console.log(guides)}
/>
```

## Privacy Features

### Anonymization

Guides are displayed with anonymized IDs to protect privacy:
- Format: "Guide #XXXX"
- Generated from hashed student ID
- Consistent across sessions for same guide
- Only reveals: university, languages, trips, rating, badge

### Information Hidden
- Real name
- Email address
- Phone number
- Photo
- Bio/personal details
- Exact location

## Database Schema

### Student Model
```prisma
model Student {
  id                String
  email             String
  name              String
  gender            String
  nationality       String
  institute         String
  languages         String[]
  interests         String[]
  status            StudentStatus
  city              String

  // Metrics
  tripsHosted       Int
  averageRating     Float?
  noShowCount       Int
  reliabilityBadge  String?

  availability      StudentAvailability[]
}
```

### TouristRequest Model
```prisma
model TouristRequest {
  id                   String
  city                 String
  dates                Json
  preferredNationality String?
  preferredLanguages   String[]
  preferredGender      String?
  interests            String[]
  status               RequestStatus
  selections           RequestSelection[]
}
```

### StudentAvailability Model
```prisma
model StudentAvailability {
  id          String
  studentId   String
  dayOfWeek   Int      // 0-6 (Sunday-Saturday)
  startTime   String   // "09:00"
  endTime     String   // "17:00"
}
```

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your database URL
```

3. **Initialize database:**
```bash
npx prisma generate
npx prisma db push
```

4. **Run development server:**
```bash
npm run dev
```

5. **Access the app:**
```
http://localhost:3000/matches/{requestId}
```

## Example Flow

1. **Tourist submits request** with preferences
2. **Algorithm finds matches** using scoring system
3. **Top 4 guides displayed** with anonymized cards
4. **Tourist selects guides** using checkboxes
5. **Selections saved** to database
6. **Guides notified** to accept/reject
7. **Connection established** upon acceptance

## Testing the Algorithm

### Example Scoring Scenario

**Guide Profile:**
- Availability: Available on requested dates ✓
- Rating: 4.5 stars
- No-shows: 0
- Interests: Photography, Food, History
- Tourist interests: Photography, Food

**Score Calculation:**
- Availability: 40 points
- Rating: 4.5 × 4 = 18 points
- Reliability: 20 points (no no-shows)
- Interest overlap: (2/2) × 20 = 20 points
- **Total: 98 points**

## Configuration

### Adjust Match Count

To change the number of matches returned (default: 4):

```typescript
// In lib/matching/algorithm.ts
return scored
  .sort((a, b) => b.score - a.score)
  .slice(0, 4) // Change this number
```

### Modify Scoring Weights

To adjust scoring priorities:

```typescript
// In calculateScore function
if (checkAvailability(student, request.dates)) score += 40 // Change weight
score += (student.averageRating || 3) * 4                 // Change multiplier
// ... etc
```

## Production Considerations

1. **Caching**: Implement Redis caching for match results
2. **Pagination**: Add pagination for large result sets
3. **Real-time Updates**: WebSocket support for live availability
4. **A/B Testing**: Test different scoring weights
5. **Analytics**: Track match acceptance rates
6. **Rate Limiting**: Prevent API abuse
7. **Error Handling**: Comprehensive error messages
8. **Logging**: Monitor algorithm performance

## License

MIT

## Support

For issues or questions, please contact support@wandernest.com
