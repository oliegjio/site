System.config({
    transpiler: 'typescript',
    packages: {
        src: {
            defaultExtension: 'ts'
        }
    }
});

System
    .import('src/Main')
    .then(null, console.error.bind(console));