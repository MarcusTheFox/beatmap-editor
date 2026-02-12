import { paths } from "@/config/paths";
import { DefaultLayout } from "@/src/app/layouts/default";
import { title } from "@/src/shared/lib";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function EditorNotFound() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-16 text-center">
            <h1 className={ title() }>Сессия не найдена</h1>

            <p className="text-lg text-default-500 mt-4">
                Похоже, вы обновили страницу или зашли по прямой ссылке.
                <br />
                Для начала работы необходимо загрузить аудиофайл.
            </p>

            <Button
                as={ Link }
                className="mt-8"
                color="primary"
                href={ paths.editor.root }
                size="lg"
                variant="shadow"
            >
                Вернуться на страницу редактора
            </Button>
        </section>
    );
}
