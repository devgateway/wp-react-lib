echo "EMBEDDABLE_URI=http://localhost:3000/#/en/embeddable" > .env

for d in */; do
   echo ".................. Compiling folder $d ..................."

     cd $d
     rm -rf build
     pnpm install
     pnpm run build
     # rm -rf node_modules
     rm pnpm-lock.yaml
    cd ..
done
