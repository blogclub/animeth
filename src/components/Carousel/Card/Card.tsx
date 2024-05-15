"use client"

import {Badge, Flex, Image, Overlay, Paper, Title} from "@mantine/core";
import classes from './Card.module.css'
import NextImage from "next/image";
import Link from "next/link";
import globalVariables from '../../../configs/globalVariables.json'
import {useLocalStorage} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from "@/configs/defaultTheme.json";

export default function Card() {
    const [theme, setTheme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: defaultTheme.primaryColor,
            breadcrumb: true
        },
    })

    return (
        <Paper
            component={Link}
            href={`/titles/`}
            radius="xl"
            className={classes.card}
        >
            <Overlay
                radius="xl"
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)"
                className={classes.overlay}
            >
                <Badge className={classes.status} color="black">В работе</Badge>
                <Badge className={classes.score} color={theme.color}>8.95</Badge>
                <Flex
                    className={classes.info}
                    direction="column"
                    justify="flex-end"
                    gap="0.25rem"
                >
                    <Badge className={classes.episodes} color={theme.color}>
                        7 / 25
                    </Badge>
                    <Title className={classes.title} order={3} lineClamp={2}>Волчица и Пряности</Title>
                </Flex>
            </Overlay>
            <Image
                alt="Anime poster"
                src="/blurred.png"
                placeholder="blur"
                blurDataURL={globalVariables.imagePlaceholder}
                width={300}
                height={325}
                component={NextImage}
                className={classes.poster}
                radius="xl"
            />
        </Paper>
    );
}