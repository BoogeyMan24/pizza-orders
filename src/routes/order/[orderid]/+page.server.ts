import { redirect } from "@sveltejs/kit";

export async function load({ params, locals: { supabase } }) {

	const { data, error } = await supabase
		.from("orders")
		.select("*")
		.eq("order_id", params.orderid)
		.single();

	if (error) {
		redirect(303, "/order");
	}

	return {
		order: data,
	};
}