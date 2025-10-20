import { title } from "@/shared/lib";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { DefaultLayout } from "../layouts";

export const EditorNotFound = () => {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-center">
                <h1 className={title()}>Сессия не найдена</h1>
                <p className="text-lg text-default-500 mt-4">
                    Похоже, вы обновили страницу или зашли по прямой ссылке.
                    <br />
                    Для начала работы необходимо загрузить аудиофайл.
                </p>
                <Button
                    as={Link}
                    href="/"
                    color="primary"
                    variant="shadow"
                    className="mt-8"
                    size="lg"
                >
                    Вернуться на главную
                </Button>
            </section>
        </DefaultLayout>
    );
}