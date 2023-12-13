import fs from 'fs';
import pdf from 'html-pdf';
import path from 'path';

export const getPath = (relativeFilePath: string): string => {
  const currentFileUrl = import.meta.url;
  const currentDir = path.dirname(currentFileUrl.replace('file://', ''));
  return path.join(currentDir, '..', relativeFilePath);
};

export const main = async () => {
  const options = { format: 'Letter' as const };

  const templateFilePath = getPath('./templates/imageListing.html');
  console.log({ templateFilePath });

  const html = fs.readFileSync(templateFilePath, 'utf8');

  console.log({ html });

  pdf
    .create(html, options)
    .toFile(getPath('./outputs/imageListing.pdf'), function (err, res) {
      if (err) return console.log(err);
      console.log({ res });
    });
};
