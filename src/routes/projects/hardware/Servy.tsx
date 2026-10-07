import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/hardware/Servy")({
	component: () => <ProjectPage to="/projects/hardware/Servy" />,
});
