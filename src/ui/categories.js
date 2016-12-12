/*package annotator.ui.categories */
"use strict";

var util = require('../util');

var $ = util.$;
var _t = util.gettext;

/**
 * function:: viewerExtension(viewer)
 *
 * An extension for the :class:`~annotator.ui.viewer.Viewer` that displays the category
 *
 * **Usage**::
 *
 *     app.include(annotator.ui.main, {
 *         viewerExtensions: [annotator.ui.categories.viewerExtension]
 *     })
 */
exports.viewerExtension = function viewerExtension(v) {
    function updateViewer(field, annotation) {
        field = $(field);
        if (annotation.category) {
            field.append('<label style="font-weight: bold; margin-top: 10px; margin-right: 10px">Motif :</label>');
            field.append('<div class="annotator-category">' + util.escapeHtml(annotation.category) + '</div>');
        } else {
            field.remove();
        }
    }

    v.addField({
        load: updateViewer
    });
};


/**
 * function:: editorExtension(editor)
 *
 * An extension for the :class:`~annotator.ui.editor.Editor` that allows
 * adding a category.
 *
 * **Usage**::
 *
 *     app.include(annotator.ui.main, {
 *         viewerExtensions: [annotator.ui.categories.viewerExtension]
 *     })
 */
exports.editorExtension = function editorExtension(e) {
    // The input element added to the Annotator.Editor wrapped in jQuery.
    // Cached to save having to recreate it everytime the editor is displayed.
    var field = null;
    var input = null;

    function updateField(field, annotation) {
        var value = '';
        if (annotation.category) {
            value = annotation.category;
        }
        input.val(value);
    }

    function setCategory(field, annotation) {
        annotation.category = input.val();
    }

    if (annotation.allAnnotations && annotation.allAnnotations.length > 0) {
      field = e.addField({
          type: 'select',
          options: annotation.allAnnotations,
          label: _t('Motif :'),
          load: updateField,
          submit: setCategory
      });
      input = $(field).find(':input');
    }
};
