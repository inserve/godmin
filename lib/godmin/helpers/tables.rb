module Godmin
  module Helpers
    module Tables
      def column_header(attribute)
        if @resource_service.orderable_column?(attribute.to_s)
          direction =
            if params[:order].present?
              if params[:order].match(/\A#{attribute.to_s}_(asc|desc)\z/)
                $1 == "desc" ? "asc" : "desc"
              elsif params[:order].match(/\A\w+_(asc|desc)\z/)
                $1
              else
                "desc"
              end
            else
              "desc"
            end
          link_to @resource_class.human_attribute_name(attribute.to_s), url_for(params.to_unsafe_h.merge(order: "#{attribute}_#{direction}")), class: "md-primary"
        else
          @resource_class.human_attribute_name(attribute.to_s)
        end
      end

      def column_value(resource, attribute)
        partial_override "#{controller_path}/columns/#{attribute}", resource: resource do
          column_value = resource.send(attribute)

          if column_value.is_a?(Date) || column_value.is_a?(Time)
            column_value = l(column_value, format: :long)
          end

          if column_value.is_a?(TrueClass) || column_value.is_a?(FalseClass)
            column_value = t(column_value.to_s)
          end

          if column_value.is_a?(ActiveRecord::Base) && column_value.respond_to?(:as_title)
            column_value = column_value.as_title
          end
          
          column_value
        end
      end
    end
  end
end
