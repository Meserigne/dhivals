/**
 * Attend que chaque URL soit chargée dans le navigateur (cache inclus).
 * Utilise decode() quand c'est disponible pour limiter les saccades à l'affichage.
 */
export function usePreloadImages() {
  async function preloadImages(srcs: string[]): Promise<void> {
    await Promise.all(
      srcs.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = async () => {
              try {
                if ('decode' in img) await img.decode()
              } catch {
                /* decode peut échouer sur certains navigateurs / formats */
              }
              resolve()
            }
            img.onerror = () => reject(new Error(`Échec du chargement : ${src}`))
            img.src = src
          }),
      ),
    )
  }

  return { preloadImages }
}
