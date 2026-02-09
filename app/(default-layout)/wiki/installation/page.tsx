import { Metadata } from "next";
import { Link } from "@heroui/link";
import { paths } from "@/config/paths";

export const metadata: Metadata = {
    title: "Как установить ритм шутер Beam & Beat на ПК | Инструкция",
    description: "Пошаговая установка игры на Windows. Скачивание архива, распаковка Portable версии, решение проблем с первым запуском.",
};

export default function InstallationPage() {
    return (
        <>
            <h1>Установка и запуск ритм шутера на ПК</h1>

            <p>
                Beam & Beat распространяется в формате "Portable". Это значит, что игра не требует сложного инсталлятора, но её нужно правильно распаковать.
            </p>

            <h2>Пошаговая установка</h2>

            <p>
                Следуйте этой инструкции, чтобы подготовить игру к первому запуску.
            </p>

            <h3>1. Скачивание</h3>

            <p>
                Всегда загружайте игру только с официального сайта.
            </p>

            <ol>
                <li>
                    Перейдите на страницу
                    <Link href={ paths.download } underline="hover">Скачать</Link>
                    .
                </li>

                <li>Нажмите кнопку загрузки последней версии.</li>

                <li>
                    Дождитесь окончания загрузки файла (это будет
                    <code>.zip</code>
                    { " " }
                    архив).
                </li>
            </ol>

            <h3>2. Распаковка</h3>

            <ul>
                <li>Нажмите правой кнопкой мыши на скачанный архив.</li>

                <li>
                    Выберите
                    <strong>"Извлечь всё..."</strong>
                    { " " }
                    (или воспользуйтесь WinRAR/7-Zip).
                </li>

                <li>
                    Выберите удобную папку (например,
                    <code>C:\Games\BeamNBeat</code>
                    ).
                </li>
            </ul>

            <h3>3. Первый запуск</h3>

            <p>
                Откройте распакованную папку. Внутри вы увидите несколько папок и исполняемый файл.
            </p>

            <ul>
                <li>
                    Найдите файл
                    <strong>BeamNBeat.exe</strong>
                    { " " }
                    (у него иконка игры).
                </li>

                <li>Запустите его двойным щелчком.</li>
            </ul>

            <h2>Возможные проблемы</h2>

            <p>
                Если игра не запускается или работает некорректно, проверьте следующие пункты.
            </p>

            <h3>Windows Defender (SmartScreen)</h3>

            <p>
                Так как игра находится в Альфа-версии и не имеет цифровой подписи издателя, Windows может показать синее окно "SmartScreen" с предупреждением о неизвестном приложении.
                <br/>
                Нажмите
                { " " }
                <u>"Подробнее"</u>
                { " " }
                { "->" }
                { " " }
                <u>"Выполнить в любом случае"</u>
                .
            </p>

            <h3>Ошибки отсутствующих DLL</h3>

            <p>
                Если при запуске вы видите ошибку об отсутствии файлов (например,
                { " " }
                <code>VCRUNTIME140.dll</code>
                ,
                { " " }
                <code>MSVCP140.dll</code>
                ), вам необходимо установить системные библиотеки Microsoft:
            </p>

            <ul>
                <li>
                    <Link isExternal href="https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist" underline="hover">Visual C++ Redistributable (x64)</Link>
                </li>

                <li>
                    <Link isExternal href="https://www.microsoft.com/en-us/download/details.aspx?id=35" underline="hover">DirectX End-User Runtime</Link>
                </li>
            </ul>
        </>
    );
}
