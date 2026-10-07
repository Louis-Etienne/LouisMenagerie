import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/softwares/NotDiscord")({
	component: () => <ProjectPage to="/projects/softwares/NotDiscord" />,
});
