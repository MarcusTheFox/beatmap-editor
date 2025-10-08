import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { UploadButton } from "@/components/UploadAudio";
import { useNavigate } from "react-router-dom";
import { useZip } from "@/hooks/useZip";
import { useLevelLoader } from "@/hooks/useLevelLoader";

export default function IndexPage() {
  const navigate = useNavigate();
  const zip = useZip();
  const { load, create } = useLevelLoader();

  const getURISongName = (file: File) => {
    return decodeURIComponent(file.name.replace(/\.[^/.]+$/, "").replace(/ /g, '_'));
  }

  const handleWavImport = (file: File) => {
    create(file);
    navigate(`/edit/${getURISongName(file)}`);
  }

  const handleZipImport = async (file: File) => {
    try {
      const levelData = await zip.importZip(file);
      load(levelData);
      navigate(`/edit/${getURISongName(levelData.audioFile)}`);
    } catch (e: any) {
      console.error(e);
      return;
    }
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Создавайте крутые треки в редакторе</span>
          <br />
          <span className={title({ color: "violet" })}>Beam & Beat</span>
          <br />
        </div>

        <div className="flex gap-3 mt-8">
          <UploadButton 
            accept=".wav" 
            radius="full" 
            size="lg" 
            color="primary" 
            variant="shadow"
            onFileSelect={handleWavImport}
          >
            Загрузить песню (.wav)
          </UploadButton>
          <UploadButton 
            accept=".zip" 
            radius="full" 
            size="lg" 
            color="secondary" 
            variant="shadow"
            onFileSelect={handleZipImport}
          >
            Загрузить проект (.zip)
          </UploadButton>
        </div>
      </section>
    </DefaultLayout>
  );
}
