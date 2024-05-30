"use client";

import {AspectRatio, Badge, Container, Group, Image, rem, SegmentedControl, Skeleton, Stack, Text} from "@mantine/core";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import classes from './Recommendations.module.css';
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";
import RecommendationsShareButton
    from "@/components/Recommendations/RecommendationsShareButton/RecommendationsShareButton";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import {OldAnimeType} from "@/types/Shikimori/Responses/Types/OldAnime.type";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import {formatAiredOnDate} from "@/utils/Misc/formatAiredOnDate";
import {useEffect, useState} from "react";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export default function Recommendations({ id }: { id: string } ) {
    const ALL = { label: "Все", value: "all" };
    const [segmentedControlData, setSegmentedControlData] = useState([ALL]);
    const router = useRouter();
    const shikimori = client();
    const [filter, setFilter] = useState(ALL.value);
    const { data, isPending, error } = useQuery({
        queryKey: ['recommendations', id, filter],
        queryFn: async () => getSimilarAnimes(),
    });
    const queryClient = useQueryClient();
    const queryData: AnimeType | undefined = queryClient.getQueryData(['anime', 'info', id]);

    useEffect(() => {
        if (segmentedControlData[1]) {
            return;
        }

        if (!queryData) {
            return;
        }

        queryData.studios?.forEach((studio) => {
            const dataArray = segmentedControlData;
            dataArray.push({ label: `Студия: ${studio.name}`, value: `studio-${studio.id}` });

            return setSegmentedControlData(dataArray);
        });

        queryData.genres?.forEach((genre) => {
            const dataArray = segmentedControlData;
            dataArray.push({ label: genre.russian, value: genre.id });

            return setSegmentedControlData(dataArray);
        });
    }, [queryData, segmentedControlData]);

    async function getSimilarAnimes() {
        if (filter === ALL.value) {
            return await shikimori.animes.similar({ id });
        }

        if (filter.includes("studio")) {
            return console.log('studio');
        }

        console.log("genre");
    }

    const mockVideos = Array.from({ length: 8 });

    if (isPending) {
        return (
            <Stack gap={rem(8)} className={classes.similar}>
                <div className={classes.segmentedControlWrapper}>
                    <Skeleton radius="md" h={32} w={64} />
                </div>
                {
                    mockVideos.map((_mockVideo, index) => {
                        return (
                            <Group
                                className={classes.group}
                                key={index}
                                align="flex-start"
                            >
                                <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
                                    <Skeleton
                                        radius="md"
                                        width="100%"
                                        height="100%"
                                    />
                                </AspectRatio>
                                <Stack className={classes.stack} h="100%" justify="flex-start">
                                    <Skeleton width="80%" height={rem(20)}/>
                                    <Skeleton width="60%" height={rem(12)}/>
                                    <Skeleton width="60%" height={rem(12)}/>
                                </Stack>
                            </Group>
                        );
                    })
                }
            </Stack>
        );
    }

    if (error) {
        return <>Error: {error.message}</>;
    }

    if (!data || data === "Retry later" || data.length === 0) {
        return;
    }

    const recommendationVideos = data?.map((anime: OldAnimeType) => {
        function redirectUser() {
            NProgress.start();
            router.push(`/titles/${anime.url.replace('/animes/', '')}`);
        }

        const translatedKind = translateAnimeKind(anime.kind);
        const translatedStatus = translateAnimeStatus({sortingType: anime.status, singular: true, lowerCase: true });

        return (
            <div key={anime.id} className={classes.recommendationWrapper}>
                <RecommendationsShareButton url={anime.url} />
                <Group
                    onClick={redirectUser}
                    className={classes.group}
                    align="flex-start"
                >
                    <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
                        <Container fluid className={classes.container}>
                            <Image
                                alt="Anime preview"
                                src={`https://shikimori.one${anime?.image.original}`}
                                placeholder="blur"
                                blurDataURL={variables.imagePlaceholder}
                                fill
                                component={NextImage}
                                radius="md"
                            />
                            <Badge
                                size="xs"
                                autoContrast
                                color="black"
                                className={classes.scoreBadge}
                            >
                                {anime.score}
                            </Badge>
                            <Badge
                                size="xs"
                                autoContrast
                                color="black"
                                className={classes.episodesBadge}
                            >
                                {anime.episodes_aired} / {anime.episodes}
                            </Badge>
                        </Container>
                    </AspectRatio>
                    <Stack className={classes.stack} h="100%" justify="flex-start">
                        <Text className={classes.title} lineClamp={2}>
                            {anime?.russian ?? anime.name}
                            {anime?.russian && ` - ${anime.name}`}
                        </Text>
                        <Text className={classes.text} lineClamp={1}>
                            {`${translatedKind}, ${translatedStatus}`}
                        </Text>
                        <Text className={classes.text} lineClamp={1}>
                            {formatAiredOnDate(anime.aired_on)}
                        </Text>
                    </Stack>
                </Group>
            </div>
        );
    });

    return (
        <Stack gap={rem(8)} className={classes.similar}>
            <div className={classes.segmentedControlWrapper}>
                <SegmentedControl
                    value={filter}
                    onChange={setFilter}
                    classNames={{
                        root: classes.segmentedControlRoot,
                        indicator: classes.segmentedControlIndicator,
                        label: classes.segmentedControlLabel
                    }}
                    radius="md"
                    withItemsBorders={false}
                    data={segmentedControlData}
                />
            </div>
            {recommendationVideos}
        </Stack>
    );
}