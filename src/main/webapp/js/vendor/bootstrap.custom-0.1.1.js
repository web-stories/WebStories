/*!
 * Megafone Bootstrap v0.1.1
 * https://github.com/FagnerMartinsBrack/MegafoneBOOTSTRAP
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "bootstrap", "jquery.ui.widget"], factory );
	} else {
		factory( jQuery );
	}
})(function( $, undefined ) {
	var jQuery = $;
/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
$.fn.sortElements = (function() {
	var sort = [].sort;
	return function( comparator, getSortable ) {
		getSortable = getSortable || function() {
			return this;
		};
		var placements = this.map(function() {
			var sortElement = getSortable.call( this );
			var parentNode = sortElement.parentNode;
			// Since the element itself will change position, we have
			// to have some way of storing it's original position in
			// the DOM. The easiest way is to have a 'flag' node:
			var nextSibling = parentNode.insertBefore(
				document.createTextNode( "" ),
				sortElement.nextSibling
			);
			return function() {
				if ( parentNode === this ) {
					throw new Error(
						"You can't sort elements if any one is a descendant of another."
					);
				}
				// Insert before flag:
				parentNode.insertBefore( this, nextSibling );
				// Remove flag:
				parentNode.removeChild( nextSibling );
				
			};
		});
		
		return sort.call( this, comparator ).each(function( i ) {
			placements[ i ].call( getSortable.call( this ) );
		});
	};
}());
(function(){
	"use strict";
	
	var itemTemplate = "";
		itemTemplate += "<li class='mselect-item'>";
			itemTemplate += "<label class='checkbox'>";
				itemTemplate += "<input type='checkbox' class='mselect-checkbox'>";
				itemTemplate += "<span class='mselect-label'></span>";
			itemTemplate += "</label>";
		itemTemplate += "</li>";
	
	$.widget( "megafone.multiselect", {
		options: {
			enhanced: null
		},
		_create: function() {
			var options = this.options;
			
			// Show enhanced element
			$( this.element ).addClass( "hidden" );
			$( options.enhanced ).removeClass( "hidden" );
			
			this._listHeading = $( options.enhanced ).find( ".multiselect-heading-list" );
			this._listBody = $( options.enhanced ).find( ".multiselect-body-list" );
			
			this._selectedBody = $( options.enhanced ).find( ".multiselect-body-selected" );
			this._selectedHeading = $( options.enhanced ).find( ".multiselect-heading-selected" );
			
			this._createItems();
			this._bind();
		},
		_createItems: function() {
			var items = "";
			var selectedItems = "";
			var $options = this.element.find( "option" );
			
			$options.each(function( index, option ) {
				var $item = $( itemTemplate );
				var $option = $( option );
				var $checkbox = $item.find( ".mselect-checkbox" );
				
				$option
					.attr( "data-position", index );
					
				$item
					.attr( "data-value", option.value )
					.attr( "data-position", index );
					
				$item
					.find( ".mselect-label" )
					.text( option.text );
				
				if ( $option.attr( "selected" ) ) {
					$item.addClass( "active" );
					$checkbox.attr( "checked", "checked" );
					selectedItems += $item[ 0 ].outerHTML;
				}
				
				items += $item[ 0 ].outerHTML;
			});
			
			this._listBody
				.prepend( items );
			
			this._selectedBody
				.empty()
				.append( selectedItems );
			
			this._updateHeading( $options.filter( ":selected" ).length );
		},
		_bind: function() {
			this._listBody
				.on( "click.mselect", "li.mselect-item", $.proxy( this._clickItem, this ) )
				.on( "click.mselect", "input[type='checkbox']", $.proxy( this._clickBox, this ) );
			this._selectedBody
				.on( "click.mselect", "li.mselect-item", $.proxy( this._clickItem, this ) )
				.on( "click.mselect", "input[type='checkbox']", $.proxy( this._clickBox, this ) );
			this._listHeading
				.on( "keyup.mselect", "input[type='text']", $.proxy( this._typeFilter, this ) );
		},
		_clickItem: function( event ) {
			var $li = $( event.currentTarget );
			
			// Do not check by default or execute a potential checkbox click
			event.preventDefault();
			event.stopPropagation();
			
			$li
				.find( ".mselect-checkbox" )
				.prop( "checked", !$li.hasClass( "active" ) );
			
			this._toggleSelectedItem( $li );
		},
		_clickBox: function( event ) {
			var $checkbox = $( event.currentTarget );
			var $li = $checkbox.parents( "li:first" );
			
			// Do not execute the li click
			event.stopPropagation();
			
			this._toggleSelectedItem( $li );
		},
		_typeFilter: function( event ) {
			var search = $( event.currentTarget ).val().toUpperCase();
			var $items = this._listBody.find( "li" );
			var $filtered = $items.map(function() {
				var text = $( this ).find( ".mselect-label" ).text();
				var words = text.split( " " );
				var index = 0;
				for ( ; index < words.length; index += 1 ) {
					if ( words[ 0 ].toUpperCase().indexOf( search ) !== -1 ) {
						return this;
					}
				}
			});
			
			$items.not( $filtered ).addClass( "hidden" );
			$filtered.removeClass( "hidden" );
			
			if ( $items.find( ":visible" ).length === 0 && search  ) {
				this._listBody
					.find( ".multiselect-empty" )
					.removeClass( "hidden" );
			} else {
				this._listBody
					.find( ".multiselect-empty" )
					.addClass( "hidden" );
			}
		},
		_toggleSelectedItem: function( $li ) {
			var $listItem, $selectedItem, $checkbox;
			var $selectedItems = this._selectedBody.find( "li" );
			var selectedSize = $selectedItems.length;
			var fromList = $selectedItems.filter( $li ).length === 0;
			
			if ( fromList ) {
				$listItem = $li;
				$selectedItem = $selectedItems
					.filter( this._positionFilter( $listItem ) );
			} else {
				$selectedItem = $li;
				$listItem = this._listBody
					.find( "li" )
					.filter( this._positionFilter( $selectedItem ) );
			}
			
			if ( $listItem.hasClass( "active" ) ) {
				$listItem.removeClass( "active" );
				
				// When clicking from the selected list does not uncheck the original
				$checkbox = $listItem.find( ".mselect-checkbox" );
				if ( $checkbox.prop( "checked" ) ) {
					$checkbox.prop( "checked", false );
				}
				
				this._removeItem( $selectedItem );
				selectedSize -= 1;
			} else {
				$listItem.addClass( "active" );
				this._insertItem( $listItem );
				selectedSize += 1;
			}	
			
			this._updateHeading( selectedSize );
		},
		_updateHeading: function( selectedSize ) {
			var text;
			var $container = this._selectedHeading
				.find( ".multiselect-selected" )
				.text( selectedSize );
		},
		_removeItem: function( $selectedItem ) {
			var $originalOption = this.element
				.find( "option" )
				.filter( this._positionFilter( $selectedItem ) );
				
			$originalOption.removeAttr( "selected" );
			$selectedItem.remove();
		},
		_insertItem: function( $listItem ) {
			var $originalOption = this.element
				.find( "option" )
				.filter( this._positionFilter( $listItem ) );
				
			$originalOption.attr( "selected", "selected" );
			this._selectedBody.append( $listItem.clone( true ) );
			this._selectedBody.find( "li" ).sortElements(function( a, b ) {
				var positionA = +$( a ).attr( "data-position" );
				var positionB = +$( b ).attr( "data-position" );
				
				return positionA > positionB ? 1 : -1;
			});
		},
		_positionFilter: function( $target ) {
			return function() {
				return $( this ).attr( "data-position" ) === $target.attr( "data-position" );
			};
		},
		_destroy: function() {
			this._listBody.empty();
			this._selectedBody.empty();
			
			this._listBody.off( ".mselect" );
			this._selectedBody.off( ".mselect" );
			
			this._listHeading.off( ".mselect" );
		}
	});
}());

});