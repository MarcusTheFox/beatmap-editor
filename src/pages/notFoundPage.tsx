import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function NotFoundPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-center">
        <h1 className={title({ color: "violet", size: "lg" })}>404</h1>
        <h2 className={title()}>Страница не найдена</h2>
        <p className="text-lg text-default-500 mt-4">
          К сожалению, страница, которую вы ищете, не существует.
          <br />
          Возможно, вы ошиблись в адресе или страница была перемещена.
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