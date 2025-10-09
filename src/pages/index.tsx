import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { UploadButton, UploadButtonRef } from "@/components/UploadAudio";
import { useNavigate } from "react-router-dom";
import { useZip } from "@/hooks/useZip";
import { useLevelLoader } from "@/hooks/useLevelLoader";
import { addToast } from "@heroui/toast";
import { LevelData } from "@/types";
import { useRef } from "react";

export default function IndexPage() {
  const navigate = useNavigate();
  const zip = useZip();
  const { load, create } = useLevelLoader();

  const archiveButtonRef = useRef<UploadButtonRef>(null);

  const getURISongName = (file: File) => {
    return decodeURIComponent(file.name.replace(/\.[^/.]+$/, "").replace(/ /g, '_'));
  }

  const handleWavImport = (file: File) => {
    create(file);
    navigate(`/edit/${getURISongName(file)}`);
  }

  const handleZipImport = async (file: File) => {
    let levelData: LevelData | null;

    try {
      levelData = await zip.importZip(file);
    } catch (e: any) {
      console.error(e);
      addToast({
        title: "Error",
        description: e.message,
        color: "danger",
        timeout: 10000,
        shouldShowTimeoutProgress: true
      });

      if (archiveButtonRef.current) {
        archiveButtonRef.current.clearFile();
      }
      
      return;
    }
    
    load(levelData);
    navigate(`/edit/${getURISongName(levelData.audioFile)}`);
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
            ref={archiveButtonRef}
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
