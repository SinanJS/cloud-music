fis.match('/lib/**.js', {
    isMod: true
})
fis.hook('cmd', {
    paths: {
        $: '/lib/jquery-1.11.3/jquery.js'
    },
    packages: [
        {
            name: 'lib',
            location: './lib',
            main: ''
        }
    ]
});