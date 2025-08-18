import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 Iniciando corrección del dataset...');

// Leer el archivo dataset.js
const datasetPath = join(process.cwd(), 'dataset.js');
let content = readFileSync(datasetPath, 'utf8');

console.log('📁 Archivo dataset.js leído correctamente');

// Contar ocurrencias antes de la corrección
const trueBefore = (content.match(/value: 'True'/g) || []).length;
const falseBefore = (content.match(/value: 'False'/g) || []).length;

console.log(`📊 Antes de la corrección:`);
console.log(`   - Valores 'True': ${trueBefore}`);
console.log(`   - Valores 'False': ${falseBefore}`);

// Corregir los valores booleanos
content = content.replace(/value: 'True'/g, "value: 'true'");
content = content.replace(/value: 'False'/g, "value: 'false'");

// Contar ocurrencias después de la corrección
const trueAfter = (content.match(/value: 'true'/g) || []).length;
const falseAfter = (content.match(/value: 'false'/g) || []).length;

console.log(`✅ Después de la corrección:`);
console.log(`   - Valores 'true': ${trueAfter}`);
console.log(`   - Valores 'false': ${falseAfter}`);

// Guardar el archivo corregido
writeFileSync(datasetPath, content, 'utf8');

console.log(`🎉 Dataset corregido exitosamente!`);
console.log(
  `   - Total de correcciones: ${trueBefore + falseBefore} → ${trueAfter + falseAfter}`,
);
