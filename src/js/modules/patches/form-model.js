var FormModel = require("enketo-core/src/js/Form-model");
var parser = new DOMParser();


FormModel.prototype.createSession = function( id, sessObj ) {
    var instance;
    var session;
    var model = this.xml.querySelector( 'model' );
    if ( !model ) {
        return;
    }

    sessObj = ( typeof sessObj === 'object' ) ? sessObj : {};
    instance = model.querySelector( 'instance[id="' + id + '"]' );

    if ( !instance ) {
        instance = parser.parseFromString( '<instance id="' + id + '"/>', 'text/xml' ).documentElement;
        this.xml.adoptNode( instance );
        model.appendChild( instance );
    }

    // fixed: /sesssion/context properties
    Object.keys(sessObj).forEach( function( prop ) {
        sessObj[ prop ] = sessObj[ prop ] || utils.readCookie( '__enketo_meta_' + prop ) || prop + ' not found';
    } );

    session = parser.parseFromString( '<session><context>' +
        Object.keys(sessObj).map(function (prop) {
            return '<' + prop + '>' + sessObj[ prop ] + '</' + prop + '>';
        } ).join( '' ) +
        '</context></session>', 'text/xml' ).documentElement;

    this.xml.adoptNode( session );
    instance.appendChild( session );
};

module.exports = FormModel