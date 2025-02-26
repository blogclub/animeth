import {StatusType} from "@/types/Shikimori/General/Status.type";
import {AnimeKindEnum} from "@/types/Shikimori/Responses/Enums/AnimeKind.enum";
import {IncompleteDateType} from "@/types/Shikimori/Responses/Types/IncompleteDate.type";
import {CharacterRoleType} from "@/types/Shikimori/Responses/Types/CharacterRole.type";
import {ExternalLinkType} from "@/types/Shikimori/Responses/Types/ExternalLink.type";
import {GenreType} from "@/types/Shikimori/Responses/Types/Genre.type";
import {PersonRoleType} from "@/types/Shikimori/Responses/Types/PersonRole.type";
import {PosterType} from "@/types/Shikimori/Responses/Types/Poster.type";
import {AnimeRatingEnum} from "@/types/Shikimori/Responses/Enums/AnimeRating.enum";
import {RelatedType} from "@/types/Shikimori/Responses/Types/Related.type";
import {ScoreStatType} from "@/types/Shikimori/Responses/Types/ScoreStat.type";
import {ScreenshotType} from "@/types/Shikimori/Responses/Types/Screenshot.type";
import {StatusStatType} from "@/types/Shikimori/Responses/Types/StatusStat.type";
import {StudioType} from "@/types/Shikimori/Responses/Types/Studio.type";
import {TopicType} from "@/types/Shikimori/Responses/Types/Topic.type";
import {UserRateType} from "@/types/Shikimori/Responses/Types/UserRate.type";
import {VideoType} from "@/types/Shikimori/Responses/Types/Video.type";

export type AnimeType = {
    airedOn: IncompleteDateType | null;
    characterRoles: CharacterRoleType[];
    createdAt: string;
    description: string | null;
    descriptionHtml: string | null;
    descriptionSource: string | null;
    duration: number | null;
    english: string | null;
    episodes: number;
    episodesAired: number;
    externalLinks: ExternalLinkType[];
    fandubbers: string[];
    fansubbers: string[];
    franchise: string | null;
    genres: GenreType[];
    id: string;
    isCensored: boolean | null;
    japanese: string | null;
    kind: AnimeKindEnum | null;
    licenseNameRu: string | null;
    licensors: string[];
    malId: string | null;
    name: string;
    nextEpisodeAt: string | null;
    personRoles: PersonRoleType[];
    poster: PosterType | null;
    rating: AnimeRatingEnum | null;
    related: RelatedType[];
    releasedOn: IncompleteDateType | null;
    russian: string | null;
    score: number | null;
    scoresStats: ScoreStatType[];
    screenshots: ScreenshotType[];
    season: string | null;
    status: StatusType | null;
    statusesStats: StatusStatType[];
    studios: StudioType[];
    synonyms: string[];
    topic: TopicType | null;
    updatedAt: string;
    url: string;
    userRate: UserRateType | null;
    videos: VideoType[];
};