import { redirect } from "@sveltejs/kit";

export async function load({ locals: { supabase } }) {
	let upcoming: Date | null = null;

	const res = await supabase
		.from ("pizza_days")
		.select("*")
		.gt("date", new Date(Date.now()).toISOString())
		.order("date", { ascending: true });


	if (res.error == null) {
		upcoming = new Date(res.data[0].date);
		upcoming.setHours(14, 0, 0);
	} else {
		console.error("couldn't get lunch days 1");
		return;
	}

	const sellingWindow = {
		start: new Date(upcoming.getTime() - 3 * 24 * 60 * 60 * 1000),
		end: upcoming
	}
	
	sellingWindow.start.setHours(0, 0, 0, 0);

	if (sellingWindow.start.getTime() - Date.now() > 0) {
		redirect(302, "/closed");
	}


	return {
		upcoming: upcoming,
		sellingWindow: sellingWindow,
	};
}

