import {Avatar, Group, Popover, rem, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import {SignedIn, SignedOut, SignOutButton, useUser} from "@clerk/nextjs";
import classes from './SideBarAccountDropdown.module.css';
import Link from "next/link";
import useRipple from "use-ripple-hook";
import NProgress from "nprogress";
import {usePathname, useRouter} from "next/navigation";
import {useContext} from "react";
import {SideBarPopoverContext} from "@/utils/Contexts/Contexts";
import {IconUserCircle} from "@tabler/icons-react";

const RIPPLE_COLOR = {
    color: "var(--animeth-ripple-color)",
}

function DropdownButton({ children, func }) {
    const [ripple, event] = useRipple(RIPPLE_COLOR)

    return (
        <UnstyledButton
            className={classes.popoverButton}
            ref={ripple}
            onPointerDown={event}
            onClick={func}
            p={rem(8)}
        >
            <Group align="center">
                {children}
            </Group>
        </UnstyledButton>
    )
}

export default function SideBarAccountDropdown() {
    const { setExpanded } = useContext(
        SideBarPopoverContext
    );
    const { user } = useUser();
    const pathname = usePathname()
    const router = useRouter()

    function toggle() {
        setExpanded((expanded) => !expanded)
    }

    function pushToProfile() {
        if (!user) {
            return
        }

        const accountURL = `/account/${user.id}`

        toggle()
        NProgress.start()
        router.push(accountURL)

        if (accountURL === pathname) {
            return NProgress.done()
        }
    }

    return (
        <Popover.Dropdown>
            <SignedIn>
                <Stack p={rem(8)} gap={0}>
                    <Group pt={rem(8)} pb={rem(8)}>
                        <Avatar
                            className={classes.avatar}
                            component={Link}
                            href={user?.imageUrl ?? '/blurred.png'}
                            src={user?.imageUrl ?? '/blurred.png'}
                            alt={`Аватар пользователя ${user?.username}`}
                            size="lg"
                        >
                            {user?.username?.[0]}
                        </Avatar>
                        <Title className={classes.title} order={4}>{user?.username}</Title>
                    </Group>
                    <DropdownButton func={pushToProfile}>
                        <IconUserCircle stroke={1.5} />
                        <Text className={classes.text}>Мой профиль</Text>
                    </DropdownButton>

                </Stack>
            </SignedIn>
            <SignedOut>
                <Stack p={rem(8)} gap={0}>
                    <Title className={classes.title} pb={rem(8)} order={2}>Аккаунт</Title>

                </Stack>
            </SignedOut>
        </Popover.Dropdown>
    )
}