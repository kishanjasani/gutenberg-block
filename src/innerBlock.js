const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, MediaUpload, InnerBlocks, BlockControls, AlignmentToolbar } = wp.editor;
const { __ } = wp.i18n;
const { PanelBody, IconButton, RangeControl } = wp.components;

const ALLOWED_BLOCKS = [ 'core/button' ];

registerBlockType( 'jk/inner-block', {

	// built-in attributes
	title: __( 'Inner Block' ),
	description: __( 'Block to generate a custom Inner Block' ),
	icon: 'format-image',
	category: 'layout',

	// custom attributes
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2'
		},
		body: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},
		alignment: {
			type: 'string',
			default: 'none'
		},
		titleColor: {
			type: 'string',
			default: 'black'
		},
		bodyColor: {
			type: 'string',
			default: 'black'
		},
		backgroundImage: {
			type: 'string',
			default: null
		},
		overlayColor: {
			type: 'string',
			default: 'black'
		},
		overlayOpacity: {
			type: 'number',
			default: 0.3
		}
	},

	// built-in functions
	edit( { attributes, setAttributes } ) {

		const { title, body, titleColor, bodyColor, backgroundImage, overlayColor, overlayOpacity, alignment } = attributes;
		// custom functions
		function onChangeTitle( newTitle ) {
			setAttributes( { title: newTitle } );
		}

		function onChangeBody( newBody ) {
			setAttributes( { body: newBody } );
		}

		function onTitleColorChange( newColor ) {
			setAttributes( { titleColor: newColor } );
		}

		function onBodyColorChange( newColor ) {
			setAttributes( { bodyColor: newColor } );
		}

		function onSelectImage( newImage ) {
			console.log( newImage );
			setAttributes( { backgroundImage: newImage.sizes.full.url } );
		}

		function overlayColorChange( newColor ) {
			setAttributes( { overlayColor: newColor } );
		}

		function overlayOpacityChange( newColor ) {
			setAttributes( { overlayOpacity: newColor } );
		}

		function onChangeAlignment( newAlignment ) {
			setAttributes( { newAlignment: newAlignment } );
		}

		return ( [
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title={ __( 'Font Color Settings', 'jk' ) }>
				    <p><strong> Select a title color: </strong></p>
					<ColorPalette value={ titleColor }
					onChange={ onTitleColorChange } />

					<p><strong> Select a text color: </strong></p>
					<ColorPalette value={ bodyColor }
					onChange={ onBodyColorChange } />
				</PanelBody>
				<PanelBody title={ __( 'Background Image Settings', 'jk' ) }>
					<p><strong> Select a background Image: </strong></p>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ backgroundImage }
						render={ ( { open } ) => {
							return ( <IconButton
							onClick={ open }
							icon="upload"
							className="editor-media-placeholder__button is-button is-default is-large">
								Background Image
							</IconButton> )
						} }
					/>
					<div style={ { marginTop: '20px', marginBottom: '40px' } }>
						<p><strong> Overlay Color: </strong></p>
						<ColorPalette value={ overlayColor }
							onChange={ overlayColorChange } />
					</div>
					<RangeControl
						label={ __( 'Overlay Opacity', 'jk' ) }
						value={ overlayOpacity }
						onChange={ overlayOpacityChange }
						min={ 0 }
						max={ 1 }
						step={ 0.05 }
					/>
				</PanelBody>
			</InspectorControls>,
			<div className="cta-container" style={ {
				backgroundImage: `url( ${ backgroundImage } )`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat'
			} }>
			<div className='cta-overlay' style={ { background: overlayColor, opacity: overlayOpacity } } ></div>
		    {
		    	<BlockControls>
					<AlignmentToolbar value={ alignment } onChange={ onChangeAlignment } />
		        </BlockControls>
		    }
				<RichText key="editable"
					tagName="h2"
					placeholder={ __( 'Your CTA Title', 'jk' ) }
					value={ title }
					onChange={ onChangeTitle }
					style={ { color: titleColor, textAlign: alignment } }
				/>

				<RichText key="editable"
					tagName="p"
					placeholder= { __( "Your CTA Description", 'jk' ) }
					value={ body }
					onChange={ onChangeBody }
					style={ { color: bodyColor, textAlign: alignment } }
				/>

				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />

			</div>
		] );
	},

	save( { attributes } ) {
		const { title, body, titleColor, bodyColor, backgroundImage, overlayColor, overlayOpacity, alignment } = attributes;
		return (
			<div className="cta-container" style={ {
				backgroundImage: `url( ${ backgroundImage } )`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			} }>
			<div className='cta-overlay' style={ { background: overlayColor, opacity: overlayOpacity } } ></div>
				<h2 style={ { color: titleColor, textAlign: alignment } }>{ title }</h2>
				<RichText.Content tagName="p"
					style= { { color: bodyColor, textAlign: alignment } }
					value={ body }
				/>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
